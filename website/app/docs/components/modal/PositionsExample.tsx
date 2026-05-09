'use client';

import { useState } from 'react';

import { Button } from '@jarl/button';
import { Modal } from '@jarl/modal';

import type { Position } from '@jarl/modal';

type PositionsExampleState = {
  isOpened: boolean;
  justify?: Position;
  align?: Position;
};

export const PositionsExample = () => {
  const [modalInfo, setModalInfo] = useState<PositionsExampleState>({
    isOpened: false,
    justify: undefined,
    align: undefined,
  });

  return (
    <>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'center', align: 'start' })}>
          Top center
        </Button>
        <Button
          onClick={() => setModalInfo({ isOpened: true, justify: 'center', align: 'center' })}
        >
          Center
        </Button>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'center', align: 'end' })}>
          Bottom center
        </Button>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'start', align: 'start' })}>
          Top left
        </Button>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'end', align: 'start' })}>
          Top right
        </Button>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'start', align: 'center' })}>
          Center left
        </Button>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'end', align: 'center' })}>
          Center right
        </Button>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'start', align: 'end' })}>
          Bottom left
        </Button>
        <Button onClick={() => setModalInfo({ isOpened: true, justify: 'end', align: 'end' })}>
          Bottom right
        </Button>
      </div>

      <Modal
        align={modalInfo.align}
        justify={modalInfo.justify}
        onCloseRequested={() => setModalInfo((prev) => ({ ...prev, isOpened: false }))}
        opened={modalInfo.isOpened}
      >
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modal content</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalInfo((prev) => ({ ...prev, isOpened: false }))}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
