"use client";

import React, { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const touristSpots: API.TouristSpot[] = [
  {
    id: 1,
    cover: "/images/1.png",
    name: "Scotland Island",
    location: "Sydney, Australia",
  },
  {
    id: 2,
    cover: "/images/2.png",
    name: "The Charles Grand Brasserie & Bar",
    location: "Lorem ipsum, Dolor",
  },
  {
    id: 3,
    cover: "/images/3.png",
    name: "Bridge Climb",
    location: "Dolor, Sit amet",
  },
  {
    id: 4,
    cover: "/images/4.png",
    name: "Scotland Island",
    location: "Sydney, Australia",
  },
  {
    id: 5,
    cover: "/images/5.png",
    name: "Clam Bar",
    location: "Etcetera veni, Vidi vici",
  },
  {
    id: 6,
    cover: "/images/6.png",
    name: "Vivid Festival",
    location: "Sydney, Australia",
  },
];

const indicatorStyle = {
  height: "3px",
  backgroundColor: "#1E9BF0",
  borderRadius: "1px",
  marginBottom: "4px",
};

export function DraggableList() {
  // const [activeId, setActiveId] = useState<number | null>(null);
  const [items, setItems] = useState<API.TouristSpot[]>(touristSpots);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: any) => {
    const { active } = event;
    // setActiveId(active.id);
  }, []);

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((_items: API.TouristSpot[]) => {
        const oldIndex = _items.findIndex((item) => item.id === active.id);
        const newIndex = _items.findIndex((item) => item.id === over.id);
        return arrayMove(_items, oldIndex, newIndex);
      });
    }

    // setActiveId(null);
    setTargetIndex(null);
  }, []);

  const handleCancelDrag = useCallback(() => {
    // setActiveId(null);
    setTargetIndex(null);
  }, []);

  const handleDragOver = useCallback(
    (event: any) => {
      const { over } = event;
      if (over) {
        setTargetIndex(items.findIndex((item) => item.id === over.id));
      }
    },
    [items]
  );

  return (
    <div className='w-[568px] mx-auto py-2'>
      <ul role='list'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleCancelDrag}
          onDragOver={handleDragOver}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((ts: API.TouristSpot, index: number) => (
              <>
                {targetIndex === index && <div style={indicatorStyle} />}
                <SortableItem key={`${ts.id}-${ts.name}`} {...ts} />
              </>
            ))}
          </SortableContext>
          {/* <DragOverlay>
            {activeId ? (
              <div
                style={{
                  width: "100%",
                  height: "3px",
                  backgroundColor: "#1E9BF0",
                }}
              />
            ) : null}
          </DragOverlay> */}
          {/* <DragOverlay>
            {activeId ? (
              <div
                style={{
                  transform: "scale(0.5)",
                  padding: "8px",
                  margin: "4px 0",
                  width: "100%",
                  height: "3px",
                  backgroundColor: "#1E9BF0",
                  // backgroundColor: "lightgreen",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  cursor: "grab",
                }}
              >
                {activeId}
              </div>
            ) : null}
          </DragOverlay> */}
        </DndContext>
      </ul>
    </div>
  );
}
