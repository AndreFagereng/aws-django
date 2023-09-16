import React from "react";

import Select, { StylesConfig } from "react-select";
import { municipalityObj, postalCodeList } from "../utils";
import { styles } from "../styles/styles";

type MunicipalityOption = {
  value: String;
  label: String;
};

export interface MultiSelectProps {
  onChange: (e: any) => void;
}

export default function MultiSelect(props: MultiSelectProps) {
  const options: MunicipalityOption[] = [];

  postalCodeList.forEach((item) => {
    options.push({ value: item.mNumber, label: item.mName });
  });

  postalCodeList.sort((first, second) => (first.mName > second.mName ? 1 : -1));
  return (
    <Select
      onChange={props.onChange}
      placeholder="Velg kommune"
      closeMenuOnSelect={false}
      styles={styles}
      isMulti
      options={options}
    />
  );
}
