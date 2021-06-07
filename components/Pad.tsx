import React, { useState, useEffect } from 'react'
import { Howl } from 'howler'
import { clipProps } from '../interfaces/index'
import { Col, Button } from 'react-bootstrap'

const Pad = ({ clip }: clipProps): JSX.Element => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === clip.code) {
      playSound()
    }
  }

  const playSound = () => {
    const sample = document.getElementById(clip.keyTrigger) as HTMLAudioElement

    setActive(true)
    setTimeout(() => setActive(false), 200)
    const sound = new Howl({
      src: [sample.src],
    })
    sound.play()
    // console.log(sample)
    // console.log(clip)
    // console.log(sound._src);
  }

  return (
    <Col className="d-grid gap-2">
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
