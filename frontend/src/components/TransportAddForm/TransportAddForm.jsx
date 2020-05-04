import React, { Component } from "react";
//redux
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

import styles from "./TransportAddForm.module.scss";
import { ReactComponent as CrossIcon } from "../../assets/images/icons/cross.svg";

class TransportAddForm extends Component {
   constructor(props) {
      super(props);
   }
   close(e) {
      e.preventDefault();
      this.props.onClose();
   }

   render() {
      return (
         <div className={styles.modal__wrapper}>
            <div className={styles.modal}>
               <form className={styles.form}>
                  <fieldset className={styles.fieldset}>
                     <legend className={styles.title}>
                        Добавить транспорт
                     </legend>
                     <button
                        className={styles.crossIcon}
                        onClick={() => {}}
                        children={<CrossIcon />}
                     ></button>
                     <div className={styles.input__wrapper}>
                        <div
                           className={`${styles.input__block} ${styles.input__block_transport}`}
                        >
                           <label className={styles.label} for="transport">
                              Тип транспорта
                           </label>
                           <input
                              className={styles.input}
                              type="text"
                              name="transport"
                              placeholder="Машина в аренду"
                           />
                        </div>
                        <div
                           className={`${styles.input__block} ${styles.input__block_company}`}
                        >
                           <label className={styles.label} for="company">
                              Компания
                           </label>
                           <input
                              className={styles.input}
                              type="text"
                              name="company"
                              placeholder="EuropeCar"
                           />
                        </div>

                        <div
                           className={`${styles.input__block} ${styles.input__block_departureFrom}`}
                        >
                           <label className={styles.label} for="departureFrom">
                              Откуда
                           </label>
                           <input
                              className={styles.input}
                              type="text"
                              name="departureFrom"
                              placeholder="Прага, аэропорт"
                           />
                        </div>
                        <div
                           className={`${styles.input__block} ${styles.input__block_departure}`}
                        >
                           <label className={styles.label} for="departure">
                              Отправление
                           </label>
                           <input
                              className={styles.input}
                              type="datetime-local"
                              name="departure"
                           />
                        </div>
                        <div
                           className={`${styles.input__block} ${styles.input__block_arrivalTo}`}
                        >
                           <label className={styles.label} for="arrivalTo">
                              Куда
                           </label>
                           <input
                              className={styles.input}
                              type="text"
                              name="arrivalTo"
                              placeholder="Рига, центр города"
                           />
                        </div>
                        <div
                           className={`${styles.input__block} ${styles.input__block_arrival}`}
                        >
                           <label className={styles.label} for="arrival">
                              Прибытие
                           </label>
                           <input
                              className={styles.input}
                              type="datetime-local"
                              name="arrival"
                           />
                        </div>
                     </div>
                  </fieldset>
                  <div className={styles.form__button}>
                     <input
                        className={styles.form__button_reset}
                        type="reset"
                        value="Отмена"
                     />
                     <input
                        className={styles.form__button_submit}
                        type="submit"
                        value="Добавить"
                     />
                  </div>
               </form>
            </div>
            <div className={styles.modal__bg} 
            onClick={(e) => this.close(e)} />
         </div>
      );
   }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransportAddForm);
