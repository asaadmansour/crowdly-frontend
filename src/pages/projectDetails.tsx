import { useEffect, useState } from 'react';
import AuthorRow from '../components/AuthorRow.tsx';
import ImageSlider from '../components/ImageSlider.tsx';
import ProjectCard from '../components/ProjectCard.tsx';
import CreatorToolKit from '../components/CreatorToolKit.tsx';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../utils/api.js';
import withLoading from '../utils/WithLoading.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../store/slices/authSlicer.js';
type Comment = {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    profile_picture?: string;
  };
};

const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;
function ProjectDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [project, setProject] = useState<any>(null);
  const [commentRefresh, setCommentRefresh] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [reply, setReply] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editingReplyText, setEditingReplyText] = useState('');
  const [commentReports, setCommentReports] = useState<any>({});
  const [replyReports, setReplyReports] = useState<any>({});
  const [activeReplyId, setActiveReplyId] = useState(0);
  const [repliesMap, setRepliesMap] = useState<any>({});
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [images, setImages] = useState([]);
  const [similarProjects, setSimilarProjects] = useState([]);
  const user = useSelector((state: any) => state.auth.user);
  console.log(user);
  const handleLoadMore = async (commentId: number) => {
    const res = await withLoading(api.get(nextPage));
    const newComments = res.data.results || res.data.result || res.data || [];
    setComments([...comments, ...newComments]);
    setNextPage(res.data.next);
  };

  const handleGetReplies = async (commentId: number) => {
    const res = await withLoading(
      api.get(`${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/replies/`)
    );
    const replies = res.data.results || res.data.result || res.data || [];
    setRepliesMap((prev: any) => ({ ...prev, [commentId]: replies }));
  };

  const handleRating = async () => {
    await withLoading(
      api.post(`${BASE_URL}/interactions/projects/${params.id}/ratings/`, { score: userRating })
    ).then(() => {
      setCommentRefresh((prev) => prev + 1);
    });
  };
  const handleReplyPost = async (commentId: number) => {
    if (!reply.trim()) return;
    await withLoading(
      api
        .post(`${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/replies/`, {
          text: reply,
        })
        .then(() => {
          handleGetReplies(commentId);
          setReply('');
          setActiveReplyId(0);
        })
    );
  };

  const handleReportComment = async (commentId: number) => {
    await withLoading(
      api.post(`${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/reports/`, {
        reason: commentReports[commentId] || 'spam',
      })
    );
  };
  const handleUpdateComment = async (commentId: number) => {
    if (!editingCommentText.trim()) return;
    await withLoading(
      api
        .patch(`${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/`, {
          text: editingCommentText,
        })
        .then(() => {
          setEditingCommentId(null);
          setEditingCommentText('');
          setCommentRefresh((prev) => prev + 1);
        })
    );
  };

  const handleDeleteComment = async (commentId: number) => {
    await withLoading(
      api
        .delete(`${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/`)
        .then(() => {
          setCommentRefresh((prev) => prev + 1);
        })
    );
  };

  const handleUpdateReply = async (commentId: number, replyId: number) => {
    if (!editingReplyText.trim()) return;
    await withLoading(
      api
        .patch(
          `${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/replies/${replyId}/`,
          {
            text: editingReplyText,
          }
        )
        .then(() => {
          setEditingReplyId(null);
          setEditingReplyText('');
          handleGetReplies(commentId);
        })
    );
  };

  const handleDeleteReply = async (commentId: number, replyId: number) => {
    await withLoading(
      api
        .delete(
          `${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/replies/${replyId}/`
        )
        .then(() => {
          handleGetReplies(commentId);
        })
    );
  };

  const handleReportReply = async (commentId: number, replyId: number) => {
    await withLoading(
      api.post(
        `${BASE_URL}/interactions/projects/${params.id}/comments/${commentId}/replies/${replyId}/reports/`,
        {
          reason: replyReports[replyId] || 'spam',
        }
      )
    );
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;
    await withLoading(
      api
        .post(`${BASE_URL}/interactions/projects/${params.id}/comments/`, {
          text: comment,
        })
        .then(() => {
          setComment('');
          setCommentRefresh((prev) => prev + 1);
          console.log(user);
        })
    );
  };

  const token = localStorage.getItem('access_token');
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser() as any);
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    const getProject = async () => {
      const projectDB = await api.get(`${BASE_URL}/projects/${params.id}/`);
      setProject(projectDB.data);
    };

    withLoading(getProject());
  }, [params.id]);
  useEffect(() => {
    const getComments = async () => {
      const commentsDB = await api.get(`${BASE_URL}/interactions/projects/${params.id}/comments/`);
      const fetchedComments =
        commentsDB.data.results || commentsDB.data.result || commentsDB.data || [];
      console.log(fetchedComments);
      setComments(fetchedComments);
      setNextPage(commentsDB.data.next);
    };
    withLoading(getComments());
  }, [params.id, commentRefresh]);

  useEffect(() => {
    const getRating = async () => {
      const ratingDB = await api.get(`${BASE_URL}/interactions/projects/${params.id}/ratings/`);
      setRating(ratingDB.data.avg);
    };
    withLoading(getRating());
  }, [params.id, commentRefresh]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const imagesDB = await api.get(`${BASE_URL}/projects/${params.id}/images/`);
        const fetchedImages =
          imagesDB.data?.results || imagesDB.data?.result || imagesDB.data || [];
        const imageList = Array.isArray(fetchedImages) ? fetchedImages : [];
        // Map over the objects to extract the 'image' string URL because ImageSlider expects a string array
        setImages(imageList.map((img: any) => img.image || img));
      } catch (error) {
        console.error('Failed to load project images:', error);
        setImages([]);
      }
    };
    const getSimilarProjects = async () => {
      try {
        const similarDB = await api.get(`${BASE_URL}/projects/${params.id}/similar/`);
        const fetchedSimilar =
          similarDB.data?.results || similarDB.data?.result || similarDB.data || [];
        const similarArray = Array.isArray(fetchedSimilar) ? fetchedSimilar : [];

        // Concurrently fetch the cover images for all similar projects
        const projectsWithImages = await Promise.all(
          similarArray.map(async (proj: any) => {
            try {
              const projImagesDB = await api.get(`${BASE_URL}/projects/${proj.id}/images/`);
              const imgData =
                projImagesDB.data?.results || projImagesDB.data?.result || projImagesDB.data || [];
              const imagesArray = Array.isArray(imgData) ? imgData : [];

              // Sort by 'order' so the intended cover image (order 0) is accurately chosen
              const sortedImages = [...imagesArray].sort(
                (a: any, b: any) => (a.order || 0) - (b.order || 0)
              );
              const coverImage =
                sortedImages.length > 0 ? sortedImages[0].image || sortedImages[0] : null;

              return { ...proj, coverImage };
            } catch (err) {
              console.error(`Failed to load image for similar proj ${proj.id}:`, err);
              return { ...proj, coverImage: null };
            }
          })
        );

        setSimilarProjects(projectsWithImages as any);
      } catch (error) {
        console.error('Failed to load similar projects:', error);
        setSimilarProjects([]);
      }
    };

    withLoading(getImages());
    withLoading(getSimilarProjects());
  }, [params.id]);

  if (!project) {
    return <></>;
  }
  const percentage = Math.round((project.total_donated / project.total_target) * 100);
  const daysLeft = Math.ceil(
    (Number(new Date(project.end_time)) - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return (
    <div className="grid grid-cols-3 gap-3 bg-[var(--color-background)] p-5">
      <div className="col-span-2">
        <ImageSlider images={images}></ImageSlider>
        <br></br>
        <span className="bg-[rgba(255,86,0,0.1)] text-[var(--color-primary)] border border-[var(--color-primary)] rounded-md label-md px-2 py-1">
          {project.category.name}
        </span>
        <h1 className="display-lg mt-2">{project.title}</h1>
        <p className="body-md">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, similique, quod aut
          impedit adipisci, perspiciatis voluptatibus asperiores minima vitae facere fugiat?
          Distinctio qui aut tenetur, aspernatur perferendis labore voluptatibus rem ipsam.
        </p>
        <AuthorRow
          image="https://i.pravatar.cc/150?img=11"
          name={project.owner}
          date={new Date(project.created_at).toLocaleDateString()}
          daysLeft={daysLeft}
        />
        <br></br>
        <h3 className="headline-md">About this campaign</h3>
        <div className="bg-[var(--color-primary)] w-32 h-1 mt-2"></div>
        <p className="body-md mt-4 text-[var(--color-text-secondary)]">{project.details}</p>
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
                Commenting as {user.username}
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
            {!comments || comments.length === 0 ? (
              <p>No comments yet</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="border-t border-[var(--color-outline-variant)] pt-4">
                  {/* Main Comment */}
                  <div className="flex gap-3 items-start justify-between">
                    <div className="flex gap-3 items-start">
                      <img
                        src="https://i.pravatar.cc/150?img=22"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-semibold text-sm">{c.author.username}</span>
                        {editingCommentId === c.id ? (
                          <div className="mt-1 flex gap-2 items-center">
                            <input
                              type="text"
                              className="bg-[var(--color-surface-low)] rounded-md px-2 py-1 text-sm border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] outline-none"
                              value={editingCommentText}
                              onChange={(e) => setEditingCommentText(e.target.value)}
                            />
                            <button
                              className="text-green-600 hover:text-green-800 text-xs font-semibold px-2 py-1 border border-green-200 rounded hover:bg-green-50 transition-colors"
                              onClick={() => handleUpdateComment(c.id)}
                            >
                              Save
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700 text-xs font-semibold px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditingCommentText('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <p className="body-md text-[var(--color-text-secondary)] mt-1">
                            {c.text}
                          </p>
                        )}

                        {/* Reply Button */}
                        <button
                          className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] text-xs mt-2 flex items-center gap-1 transition-colors"
                          onClick={() => setActiveReplyId(c.id)}
                        >
                          ↩ Reply
                        </button>
                        {/* View Replies Button */}
                        <button
                          className="text-[var(--color-primary)] text-xs mt-1 flex items-center gap-1 hover:underline transition-colors"
                          onClick={() => handleGetReplies(c.id)}
                        >
                          ▾ View Replies
                        </button>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="flex gap-2">
                      {user.id === c.author.id ? (
                        <>
                          {editingCommentId !== c.id && (
                            <button
                              onClick={() => {
                                setEditingCommentId(c.id);
                                setEditingCommentText(c.text);
                              }}
                              className="text-yellow-500 hover:text-yellow-700 text-sm font-semibold px-3 py-1 border border-yellow-200 rounded hover:bg-yellow-50 transition-colors"
                            >
                              Update
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                      <select
                        value={commentReports[c.id] || 'spam'}
                        onChange={(e) =>
                          setCommentReports((prev: any) => ({ ...prev, [c.id]: e.target.value }))
                        }
                      >
                        <option value="spam">Spam</option>
                        <option value="inappropriate">Inappropriate Content</option>
                        <option value="harassment">Harassment</option>
                        <option value="other">Other</option>
                      </select>
                      <button
                        onClick={() => handleReportComment(c.id)}
                        className="text-white-500 hover:text-red-700 text-sm font-semibold px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
                      >
                        Report
                      </button>
                    </div>
                  </div>

                  {/* Reply Input — hidden for now, you'll toggle with state */}
                  {/* Replies List */}
                  {activeReplyId === c.id ? (
                    <div className="ml-12 mt-3">
                      <div className="flex gap-2 items-start">
                        <img
                          src="https://i.pravatar.cc/150?img=11"
                          className="w-7 h-7 rounded-full object-cover mt-1"
                        />
                        <div className="flex-1">
                          <textarea
                            rows={2}
                            value={reply}
                            placeholder="Write a reply..."
                            className="w-full bg-[var(--color-surface-low)] rounded-lg p-2 text-sm resize-none outline-none border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)]"
                            onChange={(e) => setReply(e.target.value)}
                          />
                          <div className="flex justify-end mt-1">
                            <button
                              onClick={() => handleReplyPost(c.id)}
                              className="btn-primary text-xs py-1 px-3"
                            >
                              Post Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="ml-12 mt-3 flex flex-col gap-3">
                    {repliesMap[c.id] &&
                      repliesMap[c.id].map((r: any) => (
                        <div key={r.id} className="flex gap-2 items-start">
                          <img
                            src={r.author.profile_picture || 'https://i.pravatar.cc/150?img=33'}
                            className="w-7 h-7 rounded-full object-cover mt-1"
                          />
                          <div className="bg-[var(--color-surface-low)] rounded-lg px-3 py-2 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs">{r.author.username}</span>
                              <span className="label-md text-[var(--color-text-secondary)]">
                                {new Date(r.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            {editingReplyId === r.id ? (
                              <div className="mt-1 flex gap-2 items-center">
                                <input
                                  type="text"
                                  className="bg-white rounded-md px-2 py-1 text-sm border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] outline-none flex-1"
                                  value={editingReplyText}
                                  onChange={(e) => setEditingReplyText(e.target.value)}
                                />
                                <button
                                  className="text-green-600 hover:text-green-800 text-xs font-semibold px-2 py-1 border border-green-200 rounded hover:bg-green-50 transition-colors"
                                  onClick={() => handleUpdateReply(c.id, r.id)}
                                >
                                  Save
                                </button>
                                <button
                                  className="text-gray-500 hover:text-gray-700 text-xs font-semibold px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                  onClick={() => {
                                    setEditingReplyId(null);
                                    setEditingReplyText('');
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                                {r.text}
                              </p>
                            )}

                            <div className="flex gap-2 mt-2">
                              {user?.id === r.author.id ? (
                                <>
                                  {editingReplyId !== r.id && (
                                    <button
                                      onClick={() => {
                                        setEditingReplyId(r.id);
                                        setEditingReplyText(r.text);
                                      }}
                                      className="text-yellow-500 hover:text-yellow-700 text-[10px] font-semibold px-2 py-0.5 border border-yellow-200 rounded hover:bg-yellow-50 transition-colors"
                                    >
                                      Update
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteReply(c.id, r.id)}
                                    className="text-red-500 hover:text-red-700 text-[10px] font-semibold px-2 py-0.5 border border-red-200 rounded hover:bg-red-50 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                              <select
                                className="text-[10px] p-0.5 border rounded"
                                value={replyReports[r.id] || 'spam'}
                                onChange={(e) =>
                                  setReplyReports((prev: any) => ({
                                    ...prev,
                                    [r.id]: e.target.value,
                                  }))
                                }
                              >
                                <option value="spam">Spam</option>
                                <option value="inappropriate">Inappropriate</option>
                                <option value="harassment">Harassment</option>
                                <option value="other">Other</option>
                              </select>
                              <button
                                onClick={() => handleReportReply(c.id, r.id)}
                                className="text-gray-500 hover:text-red-700 text-[10px] font-semibold px-2 py-0.5 border border-red-200 rounded hover:bg-red-50 transition-colors"
                              >
                                Report
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            )}
            {nextPage && (
              <button
                onClick={handleLoadMore}
                className="w-full mt-4 py-2 label-md text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-outline-variant)] rounded-lg hover:border-[var(--color-primary)] transition-colors"
              >
                Load More Conversations ↓
              </button>
            )}
          </div>
        </div>
        <br></br>
        <div className="mt-12">
          <h3 className="headline-md mb-6">You Might Also Like</h3>
          <div className="grid grid-cols-4 gap-4">
            {similarProjects.map((project: any, index) => (
              <Link to={`/projectDetails/${project.id}/`} key={project.id || index}>
                <ProjectCard
                  image={
                    project.coverImage || 'https://placehold.co/400x300/f4f3f1/6b6b6b?text=No+Cover'
                  }
                  name={project.title}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-6">
        <div className="card p-6">
          <h2 className="text-3xl font-bold text-[var(--color-on-background)]">
            ${project.total_donated}
          </h2>
          <p className="label-md text-[var(--color-text-secondary)] mt-1">
            pledged of {project.total_target} target
          </p>

          <div className="w-full bg-[var(--color-surface-container)] rounded-full h-2 mt-3">
            <div
              className="bg-[var(--color-primary)] h-2 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 mt-3">
            <div>
              <p className="font-bold text-sm">{percentage}%</p>
              <p className="label-md text-[var(--color-text-secondary)]">Complete</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">315</p>
              <p className="label-md text-[var(--color-text-secondary)]">Donors</p>
            </div>
          </div>

          {/* Current Average Rating Display */}
          <div className="mt-4 pt-4 border-t border-[var(--color-outline-variant)]">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Project Rating
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#111]">
                {rating === null
                  ? '0.0'
                  : typeof rating === 'number'
                    ? rating.toFixed(1)
                    : parseFloat(rating).toFixed(1)}
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= (rating ? Math.round(Number(rating)) : 0)
                        ? 'text-[var(--color-primary)] text-lg'
                        : 'text-[var(--color-surface-highest)] text-lg'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* User Interaction: Rate the Project */}
          <div className="mt-4 pb-4 border-b border-[var(--color-outline-variant)]">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">
              Leave a Rating:
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`text-2xl cursor-pointer transition-colors ${
                      star <= userRating
                        ? 'text-yellow-500 drop-shadow-sm'
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              {userRating > 0 && (
                <button
                  className="bg-[var(--color-primary)] hover:bg-gray-800 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors"
                  onClick={handleRating}
                >
                  Submit Rating
                </button>
              )}
            </div>
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
