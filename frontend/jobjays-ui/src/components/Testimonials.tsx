// src/components/Testimonials.tsx

const Testimonials = () => {
    const testimonials = [
        { name: 'Robert Fox', role: 'UI/UX Designer', review: 'Amazing service, found my dream job!' },
        // Add more testimonials from Figma design
    ];

    return (
        <section className="testimonials">
            <h2>Clients Testimonial</h2>
            <div className="testimonial-cards">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                        <p>{testimonial.review}</p>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
