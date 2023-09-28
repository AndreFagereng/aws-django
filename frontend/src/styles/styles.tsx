export const styles: {
  valueContainer: (base: any) => any;
  multiValue: (base: any, state: any) => any;
  multiValueLabel: (base: any, state: any) => any;
  multiValueRemove: (base: any, state: any) => any;
} = {
  valueContainer: (base) => ({
    ...base,
    maxHeight: 150,
    overflowY: "auto",
  }),
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 } : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

export const cardStyle = {
  color: "white",
  padding: "10px 10px 10px 10px",
};
