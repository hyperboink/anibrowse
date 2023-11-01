import Image from 'next/image'
import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="error-page bg-slate-950 p-6 py-12 flex flex-col justify-center">
        <div className="error-image-wrap block mx-auto text-center">
            <Image src="/images/kawaii-angry.png" width={160} height={170} alt="" className="inline-block" unoptimized/>
            <span>404</span>
        </div>
        <div className="error-text text-center pt-4">
            <div>You got lost!</div>
            <div className="text-xl">
                Please go <Link href="/" className="underline">home</Link>.
            </div>
        </div>
    </div>
  )
}
