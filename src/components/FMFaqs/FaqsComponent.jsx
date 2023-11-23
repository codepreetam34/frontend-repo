import React from "react";
import { Container } from "react-bootstrap";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  deliveriesFaqs,
  orderingFaqs,
  productsFaqs,
} from "../../assets/FAQs/orderingFaqs";
import { accordionStyles } from "./FaqsStyle";

const FaqsComponent = ({ type, sx, defaultExpanded }) => {
  let faqsArray =
    type === "Ordering"
      ? orderingFaqs
      : type === "Delivery"
      ? deliveriesFaqs
      : productsFaqs;
  return (
    <Container style={{ marginTop: "50px" }}>
      {faqsArray?.map((elem, index) => (
        <Accordion
          sx={{ ...accordionStyles.boxAccordion, ...sx }}
          defaultExpanded={index === 0 ? true : false}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon htmlColor={"black"} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={accordionStyles.titleAccordion}>
              {elem?.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{elem?.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FaqsComponent;
