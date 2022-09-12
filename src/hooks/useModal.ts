import {useState} from "react";

export default function useModal(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return {isModalOpen, showModal, handleCancel};
}