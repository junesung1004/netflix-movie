import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Modal({ movie, type }) {
  // console.log(movie)
  // console.log(type)
  const { movieId } = useParams();
  console.log(movieId);

  return (
    <AnimatePresence>
      {movieId ? (
        <ModalContainer animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="modalContent"
            layoutId={`${type + movieId}`}
            transition={{ duration: 0.2 }}
          >
            <div className="modalBg">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              />
            </div>
            <div className="content">
              <h3>
                {movie.title}
                <span>{movie.original_title}</span>
              </h3>
              <p>{movie.overview}</p>
            </div>
          </motion.div>
        </ModalContainer>
      ) : null}
    </AnimatePresence>
  );
}

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;

  .modalContent {
    position: relative;
    width: 50%;
    max-height: 100vh;
    background: #000;
    z-index: 999;
    overflow: auto;

    .content {
      padding: 24px;
      box-sizing: border-box;
    }
  }
`;
