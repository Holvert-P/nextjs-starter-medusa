import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  return (
    <div className="bg-amber-100 px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">Tu carrito de compras está vacío</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        No tienes nada en tu carrito. Vamos a cambiar eso, use el siguiente
        enlace para comenzar a navegar por nuestros productos.
      </p>
      <div>
        <UnderlineLink href="/store">Explorar productos</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
