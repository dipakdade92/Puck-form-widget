/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Button } from "@/core/components/Button";
import { Section } from "../../components/Section";
import { AutoField, FieldLabel } from "@/core";
import { RadioField } from "@/core/components/AutoField/fields";
import { TextareaField } from "@/core/components/AutoField/fields";
import { SelectField } from "@/core/components/AutoField/fields";

const getClassName = getClassNameFactory("Form", styles);

type FormField = {
  label: string;
  type: "text" | "textarea" | "radio" | "select" | "button";
  options?: { label: string; value: string | number }[];
  href?: string;
  variant?: "primary" | "secondary";
};

export type FormProps = {
  fields: FormField[];
};

export const Form: ComponentConfig<FormProps> = {
  fields: {
    fields: {
      type: "array",
      min: 1,
      getItemSummary: (item) => item.label || "New Field",
      arrayFields: {
        label: { type: "text" },
        type: {
          type: "select",
          options: [
            { label: "Textbox", value: "text" },
            { label: "Textarea", value: "textarea" },
            { label: "Radio Button", value: "radio" },
            { label: "Dropdown", value: "select" },
            { label: "Button", value: "button" },
          ],
        },
        options: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            value: { type: "text" },
          },
        },
        href: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
        },
      },
      defaultItemProps: {
        label: "New Field",
        type: "text",
      },
    },
  },
  defaultProps: {
    fields: [{ label: "Name", type: "text" }],
  },
  render: ({ fields }) => {
    return (
      <Section className={getClassName()}>
        <form className={getClassName("form")}>
          {fields.map((field, i) => (
            <div key={i} className={getClassName("field")}>
              <label className={getClassName("label")}>{field.label}</label>

              {field.type === "text" && (
                <input type="text" className={getClassName("input")} />
              )}

              {field.type === "textarea" && (
                <TextareaField
                  field={{ type: "textarea" }}
                  name={`textarea-${i}`}
                  id={`textarea-${i}`}
                  label={field.label}
                  value={undefined}
                  onChange={() => {}}
                  readOnly={false}
                  Label={(props) => (
                    <FieldLabel
                      {...props}
                      label={props.label ?? "Textarea Field"}
                    />
                  )}
                />
              )}

              {field.type === "radio" && field.options && (
                <RadioField
                  field={{ type: "radio", options: field.options }}
                  name={`radio-${i}`}
                  onChange={() => {}}
                  value={undefined}
                  id={`radio-${i}`}
                  label={field.label}
                  readOnly={false}
                  Label={(props) => (
                    <FieldLabel
                      {...props}
                      label={props.label ?? "Radio Field"}
                    />
                  )}
                />
              )}

              {field.type === "select" && field.options && (
                <SelectField
                  field={{ type: "select", options: field.options }}
                  name={`select-${i}`}
                  id={`select-${i}`}
                  label={field.label}
                  value={undefined}
                  onChange={() => {}}
                  readOnly={false}
                  Label={(props) => (
                    <FieldLabel
                      {...props}
                      label={props.label ?? "Select Field"}
                    />
                  )}
                />
              )}

              {field.type === "button" && (
                <div className={getClassName("button-container")}>
                  <Button
                    href={field.href || "#"}
                    variant={field.variant || "primary"}
                    size="large"
                  >
                    {field.label}
                  </Button> 
                </div>
              )}
            </div>
          ))}
        </form>
      </Section>
    );
  },
};
