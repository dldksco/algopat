import React, { useState } from "react";

type Props ={
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

function CheckBox(props: Props) {
  const {label, isChecked, onChange} = props;

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>){
    onChange(event.target.checked);
  }
  // function handleCheckAll(event: React.ChangeEvent<HTMLInputElement>) {
  //   const checked = event.target.checked;
  //   const updatedItems = items.map((item) => {
  //     return {
  //       ...item,
  //       isChecked: checked,
  //     };
  //   });
  //   setItems(updatedItems);
  // }

  // function handleCheckItem(event: React.ChangeEvent<HTMLInputElement>, itemId: number) {
  //   const target = event.target as HTMLInputElement;
  //   const checked = target.checked;
  //   const updatedItems = items.map((item) => {
  //     if (item.id === itemId) {
  //       return {
  //         ...item,
  //         isChecked: checked,
  //       };
  //     }
  //     return item;
  //   });
  //   setItems(updatedItems);
  // }

  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      </label>
    </div>
  );
}
