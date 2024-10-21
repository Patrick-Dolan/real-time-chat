import Avatar from "../shared/Avatar";

function Detail() {
  return (
    <div className="w-1/4 overflow-y-auto">
      <div className="user p-4 flex flex-col items-center gap-2 border-b border-black">
        <Avatar size="md" rounded={false} />
        <h2 className="text-lg font-bold">Jane Doe</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="option">
          <div className="title flex justify-between">
            <span>Chat Settings</span>
            <img
              src="/assets/icons/ArrowDownIcon.svg"
              alt="Arrow down"
              className="cursor-pointer bg-slate-800"
            />
          </div>
        </div>
        <div className="option">
          <div className="title flex justify-between">
            <span>Privacy & Help</span>
            <img
              src="/assets/icons/ArrowDownIcon.svg"
              alt="Arrow down"
              className="cursor-pointer bg-slate-800"
            />
          </div>
        </div>
        <div className="option">
          <div className="title flex justify-between">
            <span>Shared Photos</span>
            <img
              src="/assets/icons/ArrowUpIcon.svg"
              alt="Arrow up"
              className="cursor-pointer bg-slate-800"
            />
          </div>
          <div className="photos flex flex-col gap-4 mt-2">
            <div className="photoitem flex items-center justify-between">
              <div className="photodetail flex items-center gap-2">
                <img
                  src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                  alt=""
                  className="rounded-lg h-10"
                />
                <span className="text-sm text-gray-300 font-light">
                  photoname.png
                </span>
              </div>
              <img
                src="/assets/icons/DownloadIcon.svg"
                alt="Download"
                className="bg-slate-800 cursor-pointer"
              />
            </div>
            <div className="photoitem flex items-center justify-between">
              <div className="photodetail flex items-center gap-2">
                <img
                  src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                  alt=""
                  className="rounded-lg h-10"
                />
                <span className="text-sm text-gray-300 font-light">
                  photoname.png
                </span>
              </div>
              <img
                src="/assets/icons/DownloadIcon.svg"
                alt="Download"
                className="bg-slate-800 cursor-pointer"
              />
            </div>
            <div className="photoitem flex items-center justify-between">
              <div className="photodetail flex items-center gap-2">
                <img
                  src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                  alt=""
                  className="rounded-lg h-10"
                />
                <span className="text-sm text-gray-300 font-light">
                  photoname.png
                </span>
              </div>
              <img
                src="/assets/icons/DownloadIcon.svg"
                alt="Download"
                className="bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title flex justify-between">
            <span>Shared Files</span>
            <img
              src="/assets/icons/ArrowDownIcon.svg"
              alt="Arrow down"
              className="cursor-pointer bg-slate-800"
            />
          </div>
        </div>
        <button className="bg-red-700 px-6 py-2 hover:bg-red-800">
          Block User
        </button>
      </div>
    </div>
  );
}

export default Detail;
