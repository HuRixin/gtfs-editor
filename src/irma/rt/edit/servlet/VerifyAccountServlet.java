package irma.rt.edit.servlet;

import irma.rt.edit.bean.AccountBean;
import irma.rt.edit.dao.DataAccessUtil;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class VerifyAccountServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final String successPage = "main.jsp";
	private static final String loginPage = "login.jsp";
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req,resp);
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession(true);
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		AccountBean account = DataAccessUtil.isAccountValid(username, password);
		if(account != null) {
			session.setAttribute("account", account);
			resp.sendRedirect(successPage);
		} else {
			session.setAttribute("login_failed_msg", "Invalid username or password");
			resp.sendRedirect(loginPage);
		}
	}
}
