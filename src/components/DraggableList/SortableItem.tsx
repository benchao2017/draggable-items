import React, { useState, useCallback } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
export function SortableItem({ id, name, cover, location }: API.TouristSpot) {
  const [hovered, setHovered] = useState<boolean>(false);
  // prettier-ignore
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    // transform: CSS.Transform.toString(transform),
    transform: CSS.Transform.toString({
      ...(transform as Transform),
      scaleX: isDragging ? 0.5 : 1,
      scaleY: isDragging ? 0.5 : 1,
    }),
    transition,
    // padding: "8px",
    // margin: "4px 0",
    // backgroundColor: isDragging ? "lightgreen" : "white",
    // border: "1px solid lightgray",
    // borderRadius: "4px",
    // cursor: "grab",
  };

  const onHoverItem = useCallback(() => {
    setHovered(true);
  }, []);

  const onLeaseItem = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <li
      key={`${id}-item-${name}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseOver={onHoverItem}
      onMouseLeave={onLeaseItem}
      className='flex items-center justify-between px-8 py-5 gap-x-6 hover:bg-[#F4F5F6] hover:cursor-pointer'
    >
      <div className='flex items-center justify-center min-w-0 gap-x-4'>
        <Image
          priority={true}
          src={cover}
          width={96}
          height={96}
          alt={name}
          className='rounded-xl'
        />
        <div className='min-w-0 flex-auto'>
          <p className='text-base font-semibold leading-6 text-[#292B36]'>
            {name}
          </p>
          <p className='truncate text-sm leading-[22px] text-[#A8A9AE] flex items-center justify-start'>
            <Image
              priority={true}
              src={"/images/location.png"}
              width={16}
              height={22}
              alt='location icon'
            />{" "}
            <span>{location}</span>
          </p>
        </div>
      </div>
      <div className={hovered ? "" : "hidden"}>
        <Ellipsis />
      </div>
    </li>
  );
}
