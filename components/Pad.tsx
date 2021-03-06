import { useState, useEffect, useCallback } from 'react'
import { Button, Col } from 'react-bootstrap'
import { Howl } from 'howler'

import { ClipProps } from '../interfaces/index'

const Pad = ({ ...clip }: ClipProps): JSX.Element => {
  const [active, setActive] = useState(false)

  const playSound = useCallback((): void => {
    const sample = document.getElementById(clip.keyTrigger) as HTMLAudioElement
    const sound = new Howl({
      src: [sample.src],
      preload: true,
    })
    sound.play()

    setActive(true)
    setTimeout(() => setActive(false), 200)
  }, [clip.keyTrigger])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === clip.code) {
        if (e.repeat) return
        playSound()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [clip.code, playSound])

  return (
    <Col className="d-grid gap-2" data-cy={clip.code}>
      <Button
        variant="primary"
        onClick={playSound}
        className={`shadow-sm p-4 p-lg-5 my-2 fs-5 fw-bold ${active && 'btn-active'}`}
      >
        <audio className="clip" id={clip.keyTrigger} src={clip.url} />
        {clip.keyTrigger}
      </Button>
    </Col>
  )
}

export default Pad
