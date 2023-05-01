import { NavLink, useNavigate } from '@remix-run/react';
import { useState, PropsWithChildren } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface TaskLlamaModalCommonProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

type OptoinalTaskLlamaModalProps =
  | { subTitle: string; modalDescription: string }
  | { subTitle?: never; modalDescription?: never };

type TaskLlamaModalProps = TaskLlamaModalCommonProps &
  OptoinalTaskLlamaModalProps;

export default function TaskLlamaModal({
  children,
  setOpen,
  open,
  title,
  subTitle,
  modalDescription
}: PropsWithChildren<TaskLlamaModalProps>) {
  const navigate = useNavigate();
  return (
    <Modal
      onClose={() => {
        setOpen(false);
        navigate('..');
      }}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        {modalDescription && (
          <Modal.Description>
            <Header>{subTitle}</Header>
            <p className='mb-4'>{modalDescription}</p>
          </Modal.Description>
        )}
        {children}
      </Modal.Content>
      <Modal.Actions>
        <Button
          content='Go Back!'
          icon='arrow left'
          onClick={() => {
            setOpen(false);
            navigate('..');
          }}
          negative
        />
      </Modal.Actions>
    </Modal>
  );
}
