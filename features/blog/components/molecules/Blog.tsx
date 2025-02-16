import Card from '@/shared/components/atoms/Card';

function Blog() {
  return (
    <section>
      <div className="container">
        <h2>Blog</h2>
        <p>Lorem Ipsum is available, but the majority have suffered</p>

        <div>
          <Card>
            <Card.Thumbnail>
              <img src="/bg.png" alt="" />
            </Card.Thumbnail>
            <Card.Description>
              <h2>Bed Room</h2>
              <p>The standard chunck</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae veniam fugiat vero nesciunt iste laborum
                pariatur voluptatum sed. Cumque nulla officiis repellendus dolorum fugit et dolores doloribus. Earum,
                est quo!
              </p>
            </Card.Description>
          </Card>
          <Card>
            <Card.Thumbnail>
              <img src="/bg.png" alt="" />
            </Card.Thumbnail>
            <Card.Description>
              <h2>Bed Room</h2>
              <p>The standard chunck</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae veniam fugiat vero nesciunt iste laborum
                pariatur voluptatum sed. Cumque nulla officiis repellendus dolorum fugit et dolores doloribus. Earum,
                est quo!
              </p>
            </Card.Description>
          </Card>

          <Card>
            <Card.Thumbnail>
              <img src="/bg.png" alt="" />
            </Card.Thumbnail>
            <Card.Description>
              <h2>Bed Room</h2>
              <p>The standard chunck</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae veniam fugiat vero nesciunt iste laborum
                pariatur voluptatum sed. Cumque nulla officiis repellendus dolorum fugit et dolores doloribus. Earum,
                est quo!
              </p>
            </Card.Description>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Blog;
