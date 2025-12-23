const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="text-center">

        {/* Grid pattern */}
        <div
          className="grid grid-cols-3 mb-8 justify-center"
          style={{
            columnGap: "0px",   // 👈 reduced column gap
            rowGap: "16px",     // 👈 normal vertical gap
          }}
        >
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="
                w-14 h-14
                rounded-xl
                bg-gray-400
                shadow-[0_6px_16px_rgba(0,0,0,0.18)]
              "
            />
          ))}
        </div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
          {subtitle}
        </p>

      </div>
    </div>
  );
};

export default AuthImagePattern;
