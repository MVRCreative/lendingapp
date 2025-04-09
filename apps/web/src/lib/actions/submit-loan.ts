import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'
import { User } from '@supabase/supabase-js'

interface LoanSubmissionData {
  amount: number
  term_months: number
  purpose: string
  documents: File[]
}

export async function submitLoan(data: LoanSubmissionData, user: User) {
  const supabase = createClient()

  try {
    // Create loan record
    const { data: loan, error: loanError } = await supabase
      .from('loans')
      .insert({
        borrower_id: user.id,
        amount: data.amount,
        term_months: data.term_months,
        purpose: data.purpose,
        status: 'pending',
      })
      .select()
      .single()

    if (loanError) throw loanError

    // Upload documents
    const documentPromises = data.documents.map(async (file) => {
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('loan-documents')
        .upload(`${loan.id}/${file.name}`, file)

      if (uploadError) throw uploadError

      // Create document record
      const { error: docError } = await supabase.from('documents').insert({
        loan_id: loan.id,
        user_id: user.id,
        file_url: fileData.path,
        type: 'application',
      })

      if (docError) throw docError

      return fileData
    })

    await Promise.all(documentPromises)

    return { success: true, loan }
  } catch (error) {
    console.error('Error submitting loan:', error)
    return { success: false, error }
  }
} 