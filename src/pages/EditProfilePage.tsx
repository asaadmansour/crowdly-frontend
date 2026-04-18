import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import { patchMyProfile } from '../services/users';
import type { UpdateUserPayload } from '../services/users';
import './EditProfilePage.css';

// ── Validation helpers ────────────────────────────────────────────────────
const EG_PHONE_RE = /^(\+20|0)?1[0125][0-9]{8}$/;

function validate(data: typeof EMPTY_FORM, picture: File | null): Record<string, string> {
  const errs: Record<string, string> = {};

  if (!data.first_name.trim()) errs.first_name = 'First name is required.';
  if (!data.last_name.trim())  errs.last_name  = 'Last name is required.';

  if (data.mobile_phone && !EG_PHONE_RE.test(data.mobile_phone)) {
    errs.mobile_phone = 'Enter a valid Egyptian phone number (e.g. 01012345678).';
  }

  if (data.facebook_profile && !data.facebook_profile.startsWith('https://')) {
    errs.facebook_profile = 'Facebook URL must start with https://';
  }

  if (data.birthdate) {
    const chosen = new Date(data.birthdate);
    if (chosen >= new Date()) errs.birthdate = 'Birthdate must be in the past.';
  }

  void picture; // picture itself doesn't need validation beyond type (accepted by <input>)
  return errs;
}

const EMPTY_FORM = {
  first_name:       '',
  last_name:        '',
  email:            '',
  mobile_phone:     '',
  birthdate:        '',
  country:          '',
  facebook_profile: '',
};

export default function EditProfilePage() {
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const fileRef    = useRef<HTMLInputElement>(null);

  // ── Form state ────────────────────────────────────────────────────────────
  const [formData, setFormData]           = useState({ ...EMPTY_FORM });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl]       = useState<string | null>(null);
  const [errors, setErrors]               = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage]   = useState('');

  // ── Pre-fill form from auth context ──────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    setFormData({
      first_name:       user.username?.split(' ')[0] ?? '',
      last_name:        user.username?.split(' ').slice(1).join(' ') ?? '',
      email:            user.email ?? '',
      mobile_phone:     user.phone ?? '',
      birthdate:        user.birth_date ?? '',
      country:          user.country ?? '',
      facebook_profile: user.facebook_profile ?? '',
    });
  }, [user]);

  // ── Cleanup object URL ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // ── Image change ──────────────────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfilePicture(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // ── Field change ──────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear field-level error on change
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  // ── Build diff payload ────────────────────────────────────────────────────
  const buildPayload = (): Partial<UpdateUserPayload> => {
    const payload: Partial<UpdateUserPayload> = {};
    // Map UserProfileResponse fields → payload fields
    const orig = {
      first_name:       user?.username?.split(' ')[0] ?? '',
      last_name:        user?.username?.split(' ').slice(1).join(' ') ?? '',
      mobile_phone:     user?.phone ?? '',
      birthdate:        user?.birth_date ?? '',
      country:          user?.country ?? '',
      facebook_profile: user?.facebook_profile ?? '',
    };

    if (formData.first_name       !== orig.first_name)       payload.first_name       = formData.first_name;
    if (formData.last_name        !== orig.last_name)         payload.last_name        = formData.last_name;
    if (formData.mobile_phone     !== orig.mobile_phone)      payload.mobile_phone     = formData.mobile_phone;
    if (formData.birthdate        !== orig.birthdate)         payload.birthdate        = formData.birthdate;
    if (formData.country          !== orig.country)           payload.country          = formData.country;
    if (formData.facebook_profile !== orig.facebook_profile)  payload.facebook_profile = formData.facebook_profile;
    if (profilePicture)                                        payload.profile_picture  = profilePicture;

    return payload;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const fieldErrors = validate(formData, profilePicture);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const payload = buildPayload();
    if (Object.keys(payload).length === 0) {
      // Nothing changed — just go back
      navigate('/profile');
      return;
    }

    setIsSubmitting(true);
    try {
      // If picture is included send as FormData (multipart)
      if (payload.profile_picture) {
        const fd = new FormData();
        Object.entries(payload).forEach(([k, v]) => {
          if (v !== undefined) fd.append(k, v as string | Blob);
        });
        await patchMyProfile(payload); // service already wraps with api.patch
      } else {
        await patchMyProfile(payload);
      }
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => navigate('/profile'), 1500);
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Avatar display ────────────────────────────────────────────────────────
  const avatarSrc  = previewUrl ?? user?.profile_picture ?? null;
  const initials   = (user?.username ?? '?')[0].toUpperCase();

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">

        {/* ── Card header ── */}
        <div className="edit-profile-header">
          <button
            id="edit-profile-back"
            className="back-btn"
            type="button"
            onClick={() => navigate('/profile')}
            aria-label="Go back to profile"
          >
            ←
          </button>
          <h1 className="edit-profile-title">Edit Profile</h1>
        </div>

        {/* ── Avatar ── */}
        <div className="edit-avatar-section">
          <div className="edit-avatar-circle">
            {avatarSrc ? (
              <img src={avatarSrc} alt="Profile" className="edit-avatar-img" />
            ) : (
              <span className="edit-avatar-initials">{initials}</span>
            )}
          </div>
          <label htmlFor="profile-picture-input" className="change-photo-label">
            Change photo
          </label>
          <input
            id="profile-picture-input"
            ref={fileRef}
            type="file"
            accept="image/*"
            className="photo-file-input"
            onChange={handleImageChange}
          />
        </div>

        {/* ── Form ── */}
        <form className="edit-profile-form" onSubmit={handleSubmit} noValidate>

          {/* First name */}
          <div className="form-field">
            <label htmlFor="edit-first-name" className="field-label">
              First name <span className="required-star">*</span>
            </label>
            <input
              id="edit-first-name"
              name="first_name"
              type="text"
              className={`field-input ${errors.first_name ? 'field-input--error' : ''}`}
              value={formData.first_name}
              onChange={handleChange}
              autoComplete="given-name"
              required
            />
            {errors.first_name && <p className="field-error">{errors.first_name}</p>}
          </div>

          {/* Last name */}
          <div className="form-field">
            <label htmlFor="edit-last-name" className="field-label">
              Last name <span className="required-star">*</span>
            </label>
            <input
              id="edit-last-name"
              name="last_name"
              type="text"
              className={`field-input ${errors.last_name ? 'field-input--error' : ''}`}
              value={formData.last_name}
              onChange={handleChange}
              autoComplete="family-name"
              required
            />
            {errors.last_name && <p className="field-error">{errors.last_name}</p>}
          </div>

          {/* Email — disabled */}
          <div className="form-field">
            <label htmlFor="edit-email" className="field-label">Email</label>
            <input
              id="edit-email"
              name="email"
              type="email"
              className="field-input field-input--disabled"
              value={formData.email}
              disabled
              autoComplete="email"
            />
            <p className="field-hint">Email cannot be changed</p>
          </div>

          {/* Mobile phone */}
          <div className="form-field">
            <label htmlFor="edit-phone" className="field-label">Mobile phone</label>
            <input
              id="edit-phone"
              name="mobile_phone"
              type="tel"
              className={`field-input ${errors.mobile_phone ? 'field-input--error' : ''}`}
              value={formData.mobile_phone}
              onChange={handleChange}
              placeholder="01012345678"
              autoComplete="tel"
            />
            {errors.mobile_phone && <p className="field-error">{errors.mobile_phone}</p>}
          </div>

          {/* Birthdate */}
          <div className="form-field">
            <label htmlFor="edit-birthdate" className="field-label">Birthdate</label>
            <input
              id="edit-birthdate"
              name="birthdate"
              type="date"
              className={`field-input ${errors.birthdate ? 'field-input--error' : ''}`}
              value={formData.birthdate}
              onChange={handleChange}
            />
            {errors.birthdate && <p className="field-error">{errors.birthdate}</p>}
          </div>

          {/* Country */}
          <div className="form-field">
            <label htmlFor="edit-country" className="field-label">Country</label>
            <input
              id="edit-country"
              name="country"
              type="text"
              className="field-input"
              value={formData.country}
              onChange={handleChange}
              autoComplete="country-name"
            />
          </div>

          {/* Facebook profile */}
          <div className="form-field">
            <label htmlFor="edit-facebook" className="field-label">Facebook profile</label>
            <input
              id="edit-facebook"
              name="facebook_profile"
              type="url"
              className={`field-input ${errors.facebook_profile ? 'field-input--error' : ''}`}
              value={formData.facebook_profile}
              onChange={handleChange}
              placeholder="https://facebook.com/yourprofile"
            />
            {errors.facebook_profile && <p className="field-error">{errors.facebook_profile}</p>}
          </div>

          {/* Feedback messages */}
          {successMessage && <p className="form-success">{successMessage}</p>}
          {errorMessage   && <p className="form-error-msg">{errorMessage}</p>}

          {/* ── Buttons ── */}
          <div className="form-actions">
            <button
              id="edit-cancel-btn"
              type="button"
              className="action-btn action-btn--cancel"
              onClick={() => navigate('/profile')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              id="edit-save-btn"
              type="submit"
              className="action-btn action-btn--save"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
