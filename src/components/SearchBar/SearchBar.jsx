import { Field, Form, Formik } from "formik";
import s from "./SearchBar.module.css";

const SearchBar = ({ handleChangeQuery, query }) => {
  const onSubmit = (values) => {
    // console.log("value", values);
    handleChangeQuery(values.query);
  };

  const initialValues = {
    query,
  };

  return (
    <div className={s.form}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
