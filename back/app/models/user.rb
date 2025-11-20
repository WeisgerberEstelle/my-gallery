class User < ApplicationRecord
	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
	devise :database_authenticatable, :registerable,
			:recoverable, :rememberable, :validatable,
			:jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

	def galleriste?
		role == "galleriste"
	end
	
	enum :role, {
		visiteur: "visiteur",
		galleriste: "galleriste",
		admin: "admin"
	}, default: "visiteur"
end
