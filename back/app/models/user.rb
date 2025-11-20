class User < ApplicationRecord
	devise :database_authenticatable, :registerable,
		   :recoverable, :rememberable, :validatable,
		   :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
	
	def galleriste?
	  role == "galleriste"
	end
	
	enum :role, {
	  visiteur: "visiteur",
	  galleriste: "galleriste",
	  admin: "admin"
	}, default: "visiteur"
  end