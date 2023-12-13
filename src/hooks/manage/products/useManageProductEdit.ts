import { getAdminUrl } from '@/config/url.config'
import { ProductService } from '@/services/product/product.service'
import { TypeProductInput } from '@/services/product/types/product.type'
import { getKeys } from '@/utils/custom-utils/get-keys'
import { toastError } from '@/utils/custom-utils/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageProductEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeProductInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const productId = queryId

	const {
		isSuccess,
		isError,
		data: product,
	} = useQuery({
		queryKey: ['get manage product', productId],
		queryFn: () => ProductService.getById(productId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(product).forEach((key) => {
				setValue(key, product[key])
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get product', 'An error occurred while getting product')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage product'],
		mutationFn: (data: TypeProductInput) =>
			ProductService.update(productId, data),
		onError: (error) => {
			toastError(error, 'Update product')
		},
		onSuccess: async () => {
			toastr.success('Update product', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage product', productId],
			})
			push(getAdminUrl('/products'))
		},
	})

	const onSubmit: SubmitHandler<TypeProductInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
