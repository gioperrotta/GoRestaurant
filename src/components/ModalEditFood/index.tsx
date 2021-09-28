import { useRef } from 'react';
import Modal from 'react-modal';

import { FiCheckSquare } from 'react-icons/fi';

import { Container } from '../../styles/modals';

import { FormHandles } from '@unform/core';
import Input from '../Input';

import { UpdateFoodType, ModalEditFoodProps } from '../../types/food'

export function ModalEditFood({ isOpen, editingFood, handleUpdateFood, onRequestClose } : ModalEditFoodProps) {
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: UpdateFoodType) {
    handleUpdateFood(data);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <p className="text">Editar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Container>
    </Modal>
  );
};