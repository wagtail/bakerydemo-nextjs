interface HeaderIndexProps {
  title: string;
  introduction?: string | null;
}

export default function HeaderIndex({ title, introduction }: HeaderIndexProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="index-header__title">{title}</h1>
        </div>
        <div className="col-sm-12 col-md-7">
          {introduction && (
            <p className="index-header__introduction">{introduction}</p>
          )}
        </div>
      </div>
    </div>
  );
}
