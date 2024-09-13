import { useState } from 'react';

import { ListRoomSelected } from './ListRoomSelected';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../../common/headerSlice';
import { FetchUpdatePrice } from '../service/FetchUpdatePrice';
import { getRooms } from '../../../common/roomsSlice';
import { FetchUpdateImg } from '../service/FetchUpdateImg';
import { ButtonComponent } from '../../../../components/button/ButtonComponent';
import { TrashIcon } from '@heroicons/react/24/solid';
import InputMutiFile from '../input/InputMutiFile';

function MutiSelectRoomsImgModalBody({ extraObject, closeModal }) {
	const { selectedHome } = useSelector(state => state.rooms);
	const listRoomsChecked = extraObject.selectedOptions;
	const dispatch = useDispatch();
	const [listImg, setlistImg] = useState([]);
 

	const updateFormValue = ({ updateType, value }) => {
		setlistImg([...listImg, ...value]);
	};

	const removeImage = index => {
		// Tạo một bản sao của mảng và loại bỏ phần tử tại vị trí index
		const updatedImageList = [...listImg];
		updatedImageList.splice(index, 1);

		// Cập nhật state với mảng đã được cập nhật
		setlistImg(updatedImageList);
	};

	const handleUpdateImgRoom = () => {
 
		const data = {
			listPicture: listImg,
			listRoom: listRoomsChecked.map(item => item.roomId),
		};
 
		const requestAPI = dispatch(FetchUpdateImg(data));

		try {
			requestAPI.then(response => {
				dispatch(showNotification({ message: 'Cập nhật hình thành công', status: 1 }));
				dispatch(getRooms({ id: selectedHome.id, search: '' }));
				closeModal();
				// sau khi lưu thì xóa hết hình cũ
				setlistImg([]);
			});
		} catch (error) {
			dispatch(showNotification({ message: 'Cập nhật hình thất bại', status: 0 }));
		}
	};

	return (
		<>
			<InputMutiFile updateFormValue={updateFormValue} />
			<p className="text-sm leading-5 mt-5 font-medium">{extraObject.description}</p>
			<div className="grid grid-cols-2 gap-1">
				{listImg.map((image, index) => (
					<div
						key={index}
						className=" relative bg-white border border-gray-200 rounded-lg shadow"
					>
						<img
							className="rounded-t-lg"
							src={'data:image/png;base64,' + image}
							alt=""
						/>

						<div className="absolute top-1 right-0">
							<ButtonComponent
								icon={<TrashIcon className="w-5" />}
								content="Xoá"
								callBack={() => {
									removeImage(index);
								}}
							/>
						</div>
					</div>
				))}
			</div>
			<ListRoomSelected listRoomsChecked={listRoomsChecked} />

			<div className="flex justify-end">
				<button
					onClick={() => closeModal()}
					type="button"
					className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
				>
					Huỷ
				</button>

				<button
					onClick={handleUpdateImgRoom}
					type="button"
					className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
				>
					Thêm
				</button>
			</div>
		</>
	);
}

export default MutiSelectRoomsImgModalBody;
