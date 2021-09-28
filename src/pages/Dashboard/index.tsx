import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodType, AddFoodType, UpdateFoodType } from '../../types/food'

export function Dashboard() {
  const [foods, setFoods] = useState<FoodType[]>([])
  const [editingFood, setEditingFood] = useState({
    id: -1,
    image: '',
    name: '',
    description: '',
    price: 0,
    available: true
  });

  const [isModalAddFoodOpen, setIsModalAddFoodOpen] = useState(false);
  function handleOpenModalAddFood() {
    setIsModalAddFoodOpen(true);
  };
  function handleCloseModalAddFood() {
    setIsModalAddFoodOpen(false);
  };

  const [isModalEditFoodOpen, setIsModalEditFoodOpen] = useState(false);

  function handleCloseModalEditFood() {
    setIsModalEditFoodOpen(false);
  };

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  };

  function handleEditFood(food: FoodType) {
    setEditingFood(food);
    setIsModalEditFoodOpen(true);
  }

  async function handleAddFood (food: AddFoodType) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  };

  async function handleUpdateFood (food: UpdateFoodType ) {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get('/foods');
      setFoods(response.data);
    };
    loadFoods();
  }, [])

  return (
    <>
      <Header openModalAddFood={handleOpenModalAddFood} />
      <ModalAddFood
        isOpen={isModalAddFoodOpen}
        onRequestClose={handleCloseModalAddFood}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isModalEditFoodOpen}
        onRequestClose={handleCloseModalEditFood}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDeleteFood={() => handleDeleteFood(food.id)}
              handleEditFood={() => handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

