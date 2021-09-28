import { useRef } from 'react';
import Modal from 'react-modal';

import { FiCheckSquare } from 'react-icons/fi';

import { Container } from '../../styles/modals';

import Input from '../Input';
import { FormHandles } from '@unform/core';
import { AddFoodType, ModalAddFoodProps } from '../../types/food'

export function ModalAddFood({ isOpen, handleAddFood, onRequestClose }: ModalAddFoodProps) {
  
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data : AddFoodType) {
    handleAddFood(data);
    onRequestClose();
  }

  return (
    <Modal
      isOpen= {isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container 
        ref={formRef} 
        onSubmit={handleSubmit}
      >
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Container>
    </Modal>
  );
};


