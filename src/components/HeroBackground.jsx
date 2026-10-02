const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4'

export default function HeroBackground() {
  return (
    <div className="hero-photo" aria-hidden="true">
      <video autoPlay muted loop playsInline>
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  )
}
