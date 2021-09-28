export interface FoodType{
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export type AddFoodType = Omit<FoodType, "id" | "available">;
export type UpdateFoodType = Omit<FoodType, "id" | "available">;

export interface ModalAddFoodProps {
  isOpen : boolean;
  onRequestClose: () => void;
  handleAddFood : (food: AddFoodType) => Promise<void>;
};

export interface ModalEditFoodProps {
  isOpen : boolean;
  onRequestClose: () => void;
  editingFood: FoodType;
  handleUpdateFood : (food: UpdateFoodType) => Promise<void>;
};

export interface HeaderProps {
  openModalAddFood: () => void;
}

export interface FoodProps {
  food: FoodType;
  handleEditFood: (food : FoodType) => void;
  handleDeleteFood: (id : number) => void;
}