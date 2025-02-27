import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ContainerProps {
  isOpen: boolean;
}

interface CashRegisterProps {
  id: string;
  title: string;
  description: string;
}

export const CashRegister = ({ id, title, description }: CashRegisterProps) => {
  // Estado para saber si la caja está aperturada o cerrada.
  const [isOpen, setIsOpen] = useState(false);
  // Estado para mostrar/ocultar el modal.
  const [showModal, setShowModal] = useState(false);
  // Estado para almacenar el monto de la caja chica ingresado.
  const [pettyCash, setPettyCash] = useState("");
  // Estado para almacenar el comentario.
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  // Al montar el componente, recuperamos el valor de localStorage usando la llave única.
  useEffect(() => {
    const savedPettyCash = localStorage.getItem(`pettyCash_${id}`);
    if (savedPettyCash) {
      setPettyCash(savedPettyCash);
      setIsOpen(true);
    }
  }, [id]);

  const handleClick = () => {
    if (!isOpen) {
      // Si la caja está cerrada, mostramos el modal para aperturarla.
      setShowModal(true);
    } else {
      // Si ya está aperturada, redirigimos al dashboard pasando id y el monto.
      navigate(`/dashboard/${id}`, { state: { pettyCash, title } });
    }
  };

  const handleSave = () => {
    // Guarda el monto en localStorage usando la llave única.
    localStorage.setItem(`pettyCash_${id}`, pettyCash);
    localStorage.setItem(`title_${id}`, title);
    setIsOpen(true);
    setShowModal(false);
  };

  return (
    <>
      <Container isOpen={isOpen} onClick={handleClick}>
        <div className="Title">
          La Caja {title} está {isOpen ? "Aperturada" : "Cerrada"}
        </div>
        <div className="Branch">Sucursal: {description}</div>
      </Container>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Aperturar Caja</h3>
            <label>Caja chica</label>
            <input
              type="number"
              placeholder="Monto de caja chica"
              value={pettyCash}
              onChange={(e) => setPettyCash(e.target.value)}
            />
            <label>Comentario</label>
            <textarea
              placeholder="Alguna observación..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="Buttons">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button onClick={handleSave}>Aperturar</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

/* Estilos del componente CashRegister */
const Container = styled.div<ContainerProps>`
  width: 400px;
  height: 150px;
  border-radius: 10px;
  padding: 3px;
  border: 3px solid ${({ isOpen }) => (isOpen ? "#FFFFFF" : "#6C757D")};
  background-color: ${({ isOpen }) => (isOpen ? "#007BFF" : "#E9ECEF")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }

  .Title {
    color: ${({ isOpen }) => (isOpen ? "#FFFFFF" : "#6C757D")};
    font-family: sans-serif;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }

  .Branch {
    color: ${({ isOpen }) => (isOpen ? "#FFFFFF" : "#6C757D")};
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
  }
`;

/* Estilos para el overlay del modal */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

/* Estilos para el contenido del modal */
const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  max-width: 90%;
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 1rem;
    text-align: center;
    color: #333;
  }

  label {
    margin-bottom: 0.3rem;
    color: #555;
    font-size: 14px;
  }

  input,
  textarea {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 14px;
  }

  textarea {
    resize: vertical;
    min-height: 60px;
  }

  .Buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;

    button {
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 14px;
    }

    button:nth-child(1) {
      background-color: #e5e5e5;
      color: #333;
    }

    button:nth-child(2) {
      background-color: #333;
      color: #fff;
    }
  }
`;
