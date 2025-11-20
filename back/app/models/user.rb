class User < ApplicationRecord
	devise :database_authenticatable, :registerable,
		   :recoverable, :rememberable, :validatable,
		   :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
	
	def gallery_owner?
	  role == "gallery_owner"
	end
	
	enum :role, {
	  visitor: "visitor",
	  gallery_owner: "gallery_owner",
	  admin: "admin"
	}, default: "visitor"
  end