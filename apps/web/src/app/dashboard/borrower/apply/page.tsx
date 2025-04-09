import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

const loanApplicationSchema = z.object({
  amount: z.number().min(1000).max(1000000),
  term_months: z.number().min(1).max(60),
  purpose: z.string().min(10).max(1000),
  documents: z.array(z.instanceof(File)).min(1),
})

type LoanApplicationForm = z.infer<typeof loanApplicationSchema>

export default function LoanApplicationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoanApplicationForm>({
    resolver: zodResolver(loanApplicationSchema),
  })

  const onSubmit = async (data: LoanApplicationForm) => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('Not authenticated')
      }

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
      for (const file of data.documents) {
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
      }

      toast.success('Loan application submitted successfully')
      reset()
      // Redirect to dashboard
      window.location.href = '/dashboard/borrower'
    } catch (error) {
      console.error('Error submitting loan application:', error)
      toast.error('Failed to submit loan application')
    }
  }

  return (
    <div className="py-10">
      <header>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Apply for a Loan
        </h1>
      </header>

      <main>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Amount
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="amount"
                  {...register('amount', { valueAsNumber: true })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="term_months"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Term (months)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="term_months"
                  {...register('term_months', { valueAsNumber: true })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.term_months && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.term_months.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Purpose
              </label>
              <div className="mt-1">
                <textarea
                  id="purpose"
                  rows={4}
                  {...register('purpose')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.purpose && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.purpose.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="documents"
                className="block text-sm font-medium text-gray-700"
              >
                Supporting Documents
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  id="documents"
                  multiple
                  {...register('documents')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {errors.documents && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.documents.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 