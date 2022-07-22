import { FC, useRef, memo } from 'react';
import { useDrop } from 'react-dnd';
//@ts-ignore
import { XYCoord } from 'dnd-core';
import { useSelector,useDispatch } from "@umijs/max";
import { StateType } from "@/types/dvaTypes/index";
import { ComJsonType } from '../editorLeft';
import './index.less';

interface DropProps {
  index: number;
  compInfo: ComJsonType;
}
/**
 * @file 画布涂层
 */
const Drop: FC<DropProps> = ({
  compInfo,
  index,
}) => {
  const currentCompRef = useRef(null);
  const { currentCanvasSchema } = useSelector((state: StateType) => {
    const { h5_model_type } = state;
    return { currentCanvasSchema: h5_model_type.currentCacheCopm };
  });
  const dispatch = useDispatch()
  const [, drop] = useDrop(
    {
      accept: 'comp',
      hover: (_, monitor) => {
        //@ts-ignore
        const hoverBoundingRect = currentCompRef.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (hoverClientY > hoverMiddleY + 30) {
          const occupantsIndex = currentCanvasSchema.findIndex(
            (compItem:any) => compItem.name === 'occupants',
          );

          currentCanvasSchema.splice(occupantsIndex, 1);
          currentCanvasSchema.splice(index, 0, {
            name: 'occupants',
            description: '放到这里',
          });

          dispatch({
            type: "h5_model_type/setCurrentCacheCopm",
            payload: {
              currentCacheCopm:currentCanvasSchema,
            },
          });
        }
      },
    },
    [currentCanvasSchema,index],
  );

  return (
    <div ref={drop} className={compInfo.name}>
      <div ref={currentCompRef}>
        <div
          style={{ height: `${compInfo.clientHeight}px` }}
          className="dropDemo"
        >
          {compInfo.description}
        </div>
      </div>
    </div>
  );
};

export default memo(Drop);
