'use client';

import { useState } from 'react';

import { Button } from '@jarl/button';
import { Modal } from '@jarl/modal';

export const BasicExample = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpened(true)}>Open modal</Button>

      <Modal onCloseRequested={() => setIsOpened(false)} opened={isOpened}>
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modal content</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpened(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
