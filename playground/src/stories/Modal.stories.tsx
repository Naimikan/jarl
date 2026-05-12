import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button } from '@jarl/button';
import { Modal } from '@jarl/modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'JARL/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  args: {
    opened: false,
    onCloseRequested: fn(),
    children: null,
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpened, setIsOpened] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpened(true)}>Open modal</Button>

        <Modal onCloseRequested={() => setIsOpened(false)} opened={isOpened}>
          <Modal.Backdrop />
          <Modal.Content>
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
  },
};

export const Nested: Story = {
  render: () => {
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
  },
};

export const Positions: Story = {
  args: {
    align: Modal.POSITIONS.CENTER,
    justify: Modal.POSITIONS.CENTER,
  },
  argTypes: {
    align: { control: 'select', options: Object.values(Modal.POSITIONS) },
    justify: { control: 'select', options: Object.values(Modal.POSITIONS) },
  },
  render: (args) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpened(true)}>Open modal</Button>

        <Modal
          align={args.align}
          justify={args.justify}
          onCloseRequested={() => setIsOpened(false)}
          opened={isOpened}
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
              <Button onClick={() => setIsOpened(false)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
