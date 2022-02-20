import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Container, Row } from 'react-bootstrap'
import { Howler } from 'howler'

import { audioClips } from '../utils/audioClips'
import Pad from '../components/Pad'

export default function Home(): JSX.Element {
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    Howler.volume(volume)
  }, [volume])

  return (
    <>
      <Head>
        <title>Drum Machine</title>
        <meta name="description" content="Drum machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="App vh-100 text-center">
        <Container>
          <h1 className="py-5 fw-bold">DRUM MACHINE</h1>
        </Container>

        <Container id="drum-pads" className="pb-5">
          <Row xs={2} md={4} className="justify-content-center px-0 mx-0 px-lg-5 mx-lg-5">
            {audioClips.map((clip) => (
              <Pad clip={clip} key={clip.id} />
            ))}
          </Row>
        </Container>

        <Container id="volume-control" className="pb-5">
          <h2 className="pb-3">Volume</h2>
          <input
            type="range"
            step="0.01"
            min="0"
            max="1"
            onChange={(e) => {
              setVolume(parseFloat(e.target.value))
            }}
            value={volume}
            className="w-50 slider"
          />
        </Container>
      </div>
    </>
  )
}
