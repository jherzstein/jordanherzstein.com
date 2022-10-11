;; Set the package installation directory so that packages aren't stored in the
;; ~/.emacs.d/elpa path.
(require 'package)
(setq package-user-dir (expand-file-name "./.packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("elpa" . "https://elpa.gnu.org/packages/")))

;; Initialize the package system
(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

;; Install dependencies
;;(package-install 'htmlize)

;;(use-package simple-httpd
;;  :ensure t)
;; Load publishing system
(require 'ox-publish)

;; Customize HTML output
(setq org-html-validation-link nil            ;; Don't show validation link
      org-html-head-include-scripts nil       ;; Use our own scripts
      org-html-head-include-default-style nil ;; Use our own styles
      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://thomasf.github.io/solarized-css/solarized-dark.min.css\"/>"
      ;;org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://pgaskin.net/style-new.css\"/>"
      ;;org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://git.bugswriter.com/website/plain/static/css/style.css\"/>"
;;      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://raw.githubusercontent.com/Bugswriter/akash-raj/master/style.css\"/>"
;;      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://0.0.0.0:8080/style.css\"/>"
      org-html-head-extra "<style type='text/css'>.title {text-align: center;}</style>") 

(setq org-publish-project-alist
      (list
       (list "Website"
	     :recursive t
	     :base-directory "./content"
	     :publishing-directory "./public"
	     :publishing-function 'org-html-publish-to-html
	     :with-author nil
	     :with-creator t
	     :with-toc t
	     :section-numbers nil
	     :time-stamp-file nil)))

;; site output
(org-publish-all t)

(message "Build Complete!")
