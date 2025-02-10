import { Field, Form, Formik } from "formik";
import s from "./SearchBar.module.css";

const SearchBar = ({ handleChangeQuery, query }) => {
  const initialValues = {
    query,
  };
  const onSubmit = (values, { resetForm }) => {
    // console.log("value", values);
    handleChangeQuery(values.query);
    resetForm();
  };

  return (
    <div className={s.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {() => (
          <Form>
            <Field name="query" />
            <button type="submit">Search</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
