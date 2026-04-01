import { useState } from 'react';

import { Button } from '@jarl/button';
import { Modal } from '@jarl/modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'JARL/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
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

        <Modal
          onClosed={() => console.log('Closed')}
          onCloseRequested={() => setIsOpened(false)}
          onOpened={() => console.log('Opened')}
          opened={isOpened}
        >
          <Modal.Backdrop />
          <Modal.Content>
            <p>Modal content</p>
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

        <Modal
          onClosed={() => console.log('Closed')}
          onCloseRequested={() => setIsOpenedModal1(false)}
          onOpened={() => console.log('Opened')}
          opened={isOpenedModal1}
        >
          <Modal.Backdrop />
          <Modal.Content>
            <p>Modal content</p>
            <Button onClick={() => setIsOpenedModal2(true)}>Open nested modal</Button>

            <Modal
              align="start"
              justify="end"
              onClosed={() => console.log('Closed')}
              onCloseRequested={() => setIsOpenedModal2(false)}
              onOpened={() => console.log('Opened')}
              opened={isOpenedModal2}
            >
              <Modal.Backdrop />
              <Modal.Content>
                <p>Modal nested content</p>
                <Button onClick={() => setIsOpenedModal3(true)}>Open nested modal</Button>

                <Modal
                  align="start"
                  justify="start"
                  onClosed={() => console.log('Closed')}
                  onCloseRequested={() => setIsOpenedModal3(false)}
                  onOpened={() => console.log('Opened')}
                  opened={isOpenedModal3}
                >
                  <Modal.Backdrop />
                  <Modal.Content>
                    <p>Modal nested content</p>
                    <Button onClick={() => setIsOpenedModal4(true)}>Open nested modal</Button>

                    <Modal
                      align="end"
                      justify="end"
                      onClosed={() => console.log('Closed')}
                      onCloseRequested={() => setIsOpenedModal4(false)}
                      onOpened={() => console.log('Opened')}
                      opened={isOpenedModal4}
                    >
                      <Modal.Backdrop />
                      <Modal.Content>
                        <p>Modal nested content</p>
                        <Button onClick={() => setIsOpenedModal5(true)}>Open nested modal</Button>

                        <Modal
                          align="end"
                          justify="start"
                          onClosed={() => console.log('Closed')}
                          onCloseRequested={() => setIsOpenedModal5(false)}
                          onOpened={() => console.log('Opened')}
                          opened={isOpenedModal5}
                        >
                          <Modal.Backdrop />
                          <Modal.Content>
                            <p>Modal nested content</p>
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
          onClosed={() => console.log('Closed')}
          onCloseRequested={() => setIsOpened(false)}
          onOpened={() => console.log(document.activeElement)}
          opened={isOpened}
        >
          <Modal.Backdrop />
          <Modal.Content>
            <p>Modal content</p>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
