import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { emailRegex } from "@lib/util/regex"
import { Customer } from "@medusajs/medusa"
import EditButton from "@modules/account/components/edit-button"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { useUpdateMe } from "medusa-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

type EditEmailModalProps = {
  customer: Omit<Customer, "password_hash">
}

type FormValues = {
  email: string
}

const EditEmailModal: React.FC<EditEmailModalProps> = ({ customer }) => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { mutate } = useUpdateMe()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: customer.email,
    },
  })

  const { refetchCustomer } = useAccount()

  const submit = handleSubmit((data) => {
    setSubmitting(true)
    setError(undefined)

    if (data.email === customer.email) {
      setSubmitting(false)
      setError("Debe ingresar un nuevo correo electrónico.")
      return
    }

    mutate(
      { id: customer.id, ...data },
      {
        onSuccess: () => {
          setSubmitting(false)
          refetchCustomer()
          close()
        },
        onError: () => {
          setSubmitting(false)
          setError(
            "No se puede actualizar el correo electrónico, inténtelo de nuevo más tarde."
          )
        },
      }
    )
  })

  return (
    <div>
      <EditButton onClick={open} />
      <Modal isOpen={state} close={close}>
        <Modal.Title>Edita tu correo electrónico</Modal.Title>
        <Modal.Body>
          <div className="flex flex-col w-full">
            <Input
              label="Correo electrónico"
              {...register("email", {
                required: "Correo electrónico requerido",
                pattern: {
                  value: emailRegex,
                  message: "Debe ser un correo electrónico válido",
                },
              })}
              errors={errors}
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
            onClick={close}
          >
            Cancelar
          </Button>
          <Button className="min-h-0" onClick={submit} disabled={submitting}>
            Guardar
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditEmailModal
