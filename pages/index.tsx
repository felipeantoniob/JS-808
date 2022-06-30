import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import { Howler } from 'howler'

import Pad from '../components/Pad'
import { audioClips } from '../utils/audioClips'

export default function Home(): JSX.Element {
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    Howler.volume(volume)
  }, [volume])

  return (
    <>
      <Head>
        <title>JS-808</title>
        <meta name="description" content="Interactive drum machine website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="App vh-100 text-center">
        <Container>
          <Row>
            <h1 className="py-5 fw-bold" data-cy="title">
              JS-808
            </h1>
          </Row>
          <Row
            id="drum-pads"
            xs={2}
            md={4}
            className="justify-content-center px-0 mx-0 px-lg-5 mx-lg-5 pb-5"
            data-cy="drum-pads"
          >
            {audioClips.map((clip) => (
              <Pad key={clip.id} {...clip} />
            ))}
          </Row>

          <div id="volume-control" className="pb-5" data-cy="volume-control">
            <Row>
              <h2 className="pb-3">Volume</h2>
            </Row>
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
          </div>
        </Container>
      </main>
    </>
  )
}
