
function Banner({ title }: { title: string }) {
  return (
    <div className="bg-noir bg-opacity-50 flex items-center justify-center h-screen">
      <div className="text-5xl font-bold text-blanc">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default Banner;