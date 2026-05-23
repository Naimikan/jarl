'use client';

import { useState } from 'react';

import { Button } from '@jarl/button';
import { Modal } from '@jarl/modal';

export const NestedExample = () => {
  const [isOpenedModal1, setIsOpenedModal1] = useState(false);
  const [isOpenedModal2, setIsOpenedModal2] = useState(false);
  const [isOpenedModal3, setIsOpenedModal3] = useState(false);
  const [isOpenedModal4, setIsOpenedModal4] = useState(false);
  const [isOpenedModal5, setIsOpenedModal5] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenedModal1(true)}>Open modal</Button>

      <Modal onCloseRequested={() => setIsOpenedModal1(false)} opened={isOpenedModal1}>
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Modal.Title>Modal 1</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modal 1 content</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpenedModal1(false)}>Close</Button>
            <Button onClick={() => setIsOpenedModal2(true)}>Open nested modal</Button>
          </Modal.Footer>

          <Modal
            align="start"
            justify="end"
            onCloseRequested={() => setIsOpenedModal2(false)}
            opened={isOpenedModal2}
          >
            <Modal.Backdrop />
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>
                <Modal.Title>Modal 2</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Modal 2 content</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setIsOpenedModal2(false)}>Close</Button>
                <Button onClick={() => setIsOpenedModal3(true)}>Open nested modal</Button>
              </Modal.Footer>

              <Modal
                align="start"
                justify="start"
                onCloseRequested={() => setIsOpenedModal3(false)}
                opened={isOpenedModal3}
              >
                <Modal.Backdrop />
                <Modal.Content>
                  <Modal.CloseButton />
                  <Modal.Header>
                    <Modal.Title>Modal 3</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Modal 3 content</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => setIsOpenedModal3(false)}>Close</Button>
                    <Button onClick={() => setIsOpenedModal4(true)}>Open nested modal</Button>
                  </Modal.Footer>

                  <Modal
                    align="end"
                    justify="end"
                    onCloseRequested={() => setIsOpenedModal4(false)}
                    opened={isOpenedModal4}
                  >
                    <Modal.Backdrop />
                    <Modal.Content>
                      <Modal.CloseButton />
                      <Modal.Header>
                        <Modal.Title>Modal 4</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Modal 4 content</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => setIsOpenedModal4(false)}>Close</Button>
                        <Button onClick={() => setIsOpenedModal5(true)}>Open nested modal</Button>
                      </Modal.Footer>

                      <Modal
                        align="end"
                        justify="start"
                        onCloseRequested={() => setIsOpenedModal5(false)}
                        opened={isOpenedModal5}
                      >
                        <Modal.Backdrop />
                        <Modal.Content>
                          <Modal.CloseButton />
                          <Modal.Header>
                            <Modal.Title>Modal 5</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p>Modal 5 content</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={() => setIsOpenedModal5(false)}>Close</Button>
                          </Modal.Footer>
                        </Modal.Content>
                      </Modal>
                    </Modal.Content>
                  </Modal>
                </Modal.Content>
              </Modal>
            </Modal.Content>
          </Modal>
        </Modal.Content>
      </Modal>
    </>
  );
};
