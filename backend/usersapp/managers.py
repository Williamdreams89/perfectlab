from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    """
    Overide the base user manager class to utilize email authent
    -cation rather than username authentication.
    """
    def create_user(self, email,first_name, last_name,password=None, **kwargs):
        """Utility func for creating normal regular users"""
        if not email:
            raise ValueError("Email mustn't be blank.")
        email = self.normalize_email(email)
        user= self.model(email=email, first_name=first_name, last_name=last_name, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user 
    
    def create_superuser(self, email, first_name, last_name, password, **kwargs):
        """The superuser of our database models"""
        user = self.create_user(email, first_name, last_name, password, **kwargs)
        user.is_verified = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    