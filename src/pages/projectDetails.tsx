import { useState } from 'react';
import AuthorRow from '../components/AuthorRow.tsx';
import ImageSlider from '../components/ImageSlider.tsx';
import ProjectCard from '../components/ProjectCard.tsx';
import CreatorToolKit from '../components/CreatorToolKit.tsx';
import { useParams } from 'react-router';
function ProjectDetails() {
  const params = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const handleSubmitComment = () => {
    console.log(comment);
    setComment('');
    setComments([...comments, comment]);
  };

  const similarProjects = [
    {
      name: 'Coral Restorers Collective',
      image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400',
    },
    {
      name: 'The Sun-Lite Initiative',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
    },
    {
      name: 'Urban Soil Revive',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    },
    {
      name: 'Old Growth Watch',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400',
    },
  ];
  const images: string[] = [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
    'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800',
  ];
  return (
    <div className="grid grid-cols-3 gap-3 bg-[var(--color-background)] p-5">
      <div className="col-span-2">
        <ImageSlider images={images}></ImageSlider>
        <br></br>
        <span className="bg-[rgba(255,86,0,0.1)] text-[var(--color-primary)] border border-[var(--color-primary)] rounded-md label-md px-2 py-1">
          Ecology & Ethics
        </span>
        <h1 className="display-lg mt-2">Project Alpha: Reclaiming the Urban Canopy</h1>
        <p className="body-md">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, similique, quod aut
          impedit adipisci, perspiciatis voluptatibus asperiores minima vitae facere fugiat?
          Distinctio qui aut tenetur, aspernatur perferendis labore voluptatibus rem ipsam.
          Accusamus reprehenderit, dolores deserunt quidem quis ex voluptatum aliquid totam eveniet
          itaque fugiat facilis at. Nobis itaque, totam repellendus, vitae atque labore deleniti
          accusamus cupiditate quasi pariatur rem. Voluptates, inventore facere dolorem numquam quod
          dolore, sint provident alias explicabo minima placeat magnam ipsam, cum quidem. Eaque
          nulla nisi consequatur eveniet modi totam aut neque, voluptatum reprehenderit vel dicta,
          illo alias debitis molestias suscipit aliquam? Ad iusto eos natus eligendi.
        </p>
        <AuthorRow
          image="https://i.pravatar.cc/150?img=11"
          name="Marcus Thorne"
          date="Oct 24, 2024"
          daysLeft={12}
        />
        <br></br>
        <h3 className="headline-md">About this campaign</h3>
        <div className="bg-[var(--color-primary)] w-32 h-1 mt-2"></div>
        <p className="body-md mt-4 text-[var(--color-text-secondary)]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fuga itaque adipisci commodi
          ipsa facere ratione cum, ea maiores temporibus architecto quibusdam officiis. Et ab iste
          culpa ipsa expedita voluptatum perspiciatis, nihil eaque nulla magni sint, sit nemo ipsam,
          deleniti molestiae! Vero necessitatibus repudiandae, vitae quaerat autem hic cupiditate
          saepe!
        </p>
        <br></br>
        <h3 className="headline-md mt-8">Community Feed</h3>
        <div className="mt-4 border border-[var(--color-outline-variant)] rounded-lg p-4">
          <div className="flex gap-3 items-start">
            <img
              src="https://i.pravatar.cc/150?img=11"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="label-md text-[var(--color-text-secondary)] mb-2">
                Commenting as Jane Doe
              </p>
              <textarea
                rows={4}
                placeholder="Add your voice to the movement..."
                className="w-full bg-[var(--color-surface-low)] rounded-lg p-3 text-sm resize-none outline-none border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)]"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <div className="flex justify-end mt-2">
                <button className="btn-primary" onClick={handleSubmitComment}>
                  Post Insight
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {comments.map((c, index) => (
              <div
                key={index}
                className="flex gap-3 items-start border-t border-[var(--color-outline-variant)] pt-4"
              >
                <img
                  src="https://i.pravatar.cc/150?img=22"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-sm">Jane Doe</span>
                  <p className="body-md text-[var(--color-text-secondary)] mt-1">{c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <div className="mt-12">
          <h3 className="headline-md mb-6">You Might Also Like</h3>
          <div className="grid grid-cols-4 gap-4">
            {similarProjects.map((project, index) => (
              <ProjectCard key={index} image={project.image} name={project.name} />
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-6">
        <div className="card p-6">
          <h2 className="text-3xl font-bold text-[var(--color-on-background)]">$12,450</h2>
          <p className="label-md text-[var(--color-text-secondary)] mt-1">
            pledged of $150,000 target
          </p>

          <div className="w-full bg-[var(--color-surface-container)] rounded-full h-2 mt-3">
            <div
              className="bg-[var(--color-primary)] h-2 rounded-full"
              style={{ width: '45%' }}
            ></div>
          </div>

          <div className="grid grid-cols-2 mt-3">
            <div>
              <p className="font-bold text-sm">38%</p>
              <p className="label-md text-[var(--color-text-secondary)]">Complete</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">315</p>
              <p className="label-md text-[var(--color-text-secondary)]">Donors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="font-bold text-sm">4.3</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[var(--color-primary)]">
                  ★
                </span>
              ))}
            </div>
            <span className="label-md text-[var(--color-text-secondary)]">(48 ratings)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6">
            {[5, 10, 15, 35].slice(0, 3).map((amount) => (
              <div
                key={amount}
                className="py-3 bg-white border border-[var(--color-outline-variant)] rounded-lg text-center text-sm font-semibold cursor-pointer hover:border-[var(--color-primary)] transition-colors"
              >
                ${amount}
              </div>
            ))}
            <div className="py-3  bg-white border border-[var(--color-outline-variant)] rounded-lg text-center text-sm font-semibold cursor-pointer hover:border-[var(--color-primary)] transition-colors">
              $35
            </div>
            <div className=" bg-white col-span-2 py-3 border border-[var(--color-outline-variant)] rounded-lg text-center text-sm font-semibold cursor-pointer hover:border-[var(--color-primary)] transition-colors">
              Custom ✎
            </div>
          </div>

          <button className="btn-primary w-full mt-4 py-3">Confirm Donation</button>

          <p className="label-md text-[var(--color-text-secondary)] text-center mt-3">
            By pledging, you agree to our Editorial Guidelines.
          </p>
        </div>
        <CreatorToolKit></CreatorToolKit>
      </div>
    </div>
  );
}

export default ProjectDetails;
