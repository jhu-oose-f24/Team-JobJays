// src/components/PopularCategories.tsx

const PopularCategories = () => {
    return (
        <section className="popular-categories">
            <h2>Popular Categories</h2>
            <div className="categories">
                <button>Graphics & Design</button>
                <button>Code & Programming</button>
                <button>Digital Marketing</button>
                <button>Data & Science</button>
                {/* Add more categories based on Figma */}
            </div>
        </section>
    );
};

export default PopularCategories;
