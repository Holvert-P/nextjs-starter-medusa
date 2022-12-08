import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("Ocurrió un error. Inténtalo de nuevo.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      <h1 className="text-large-semi uppercase mb-6">
        Conviértete en miembro de Mia Secret
      </h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
        Cree su perfil de miembro de Mia Secret y obtenga acceso a una compra
        mejorada experiencia.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Nombre"
            {...register("first_name", { required: "Nombre requerido" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Apellido"
            {...register("last_name", { required: "Apellido requerido" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Correo electrónico"
            {...register("email", { required: "Correo electrónico requerido" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Teléfono"
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Contraseña"
            {...register("password", {
              required: "Contraseña requerida",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              Estas credenciales no coinciden con nuestros registros
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          Al crear una cuenta, acepta las{" "}
          <Link href="/content/privacy-policy">
            <a className="underline">Políticas de privacidad</a>
          </Link>{" "}
          de Mia Secret y{" "}
          <Link href="/content/terms-of-use">
            <a className="underline">Términos de Uso</a>
          </Link>
          .
        </span>
        <Button className="mt-6">Unirse</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        ¿Ya eres usuario?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Inicia sesión
        </button>
        .
      </span>
    </div>
  )
}

export default Register
