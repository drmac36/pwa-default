import React from "react";
import { mergeClasses } from "@magento/venia-ui/lib/classify";
import defaultClasses from "./newsletter.module.css";
import { shape, string } from "prop-types";
import NewsletterForm from '../../../Newsletter';

// Component for testing setup

const Newsletter = (props) => {

  const classes = mergeClasses(defaultClasses, props.classes);
  return (
    <div className={classes.testClass}>
      <NewsletterForm button_title={props.button_title} success_message={props.success_message} />
    </div>
  );
};


Newsletter.propTypes = {
  classes: shape({
    testClass: string,
  }),
  contentType: string,
  appearance: string,
  button_title: string,
  success_message: string
};

export default Newsletter;